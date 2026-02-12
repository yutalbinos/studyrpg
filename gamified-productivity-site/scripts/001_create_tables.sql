-- ============================================================================
-- PROFILES TABLE (linked to auth.users)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  friend_code TEXT UNIQUE DEFAULT UPPER(SUBSTR(MD5(RANDOM()::TEXT), 1, 8)),
  player_class TEXT,
  class_rarity TEXT DEFAULT 'common',
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  gold INTEGER DEFAULT 50,
  streak INTEGER DEFAULT 1,
  longest_streak INTEGER DEFAULT 1,
  total_tasks_completed INTEGER DEFAULT 0,
  total_pomodoro_completed INTEGER DEFAULT 0,
  defeated_mobs TEXT[] DEFAULT '{}',
  completed_dungeons TEXT[] DEFAULT '{}',
  inventory JSONB DEFAULT '[]'::JSONB,
  equipped JSONB DEFAULT '{"weapon":null,"armor":null,"shield":null,"helmet":null,"boots":null,"ring":null,"amulet":null}'::JSONB,
  unlocked_rewards TEXT[] DEFAULT '{}',
  achievements JSONB DEFAULT '[]'::JSONB,
  badges TEXT[] DEFAULT '{}',
  quest_progress JSONB DEFAULT '{}'::JSONB,
  daily_quests_completed TEXT[] DEFAULT '{}',
  last_daily_reset TEXT,
  last_active_date TEXT,
  tutorial_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);
-- Allow reading other profiles for leaderboard/friends
CREATE POLICY "profiles_select_public" ON public.profiles FOR SELECT USING (TRUE);

-- ============================================================================
-- FRIENDS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.friends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  friend_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

ALTER TABLE public.friends ENABLE ROW LEVEL SECURITY;

CREATE POLICY "friends_select" ON public.friends FOR SELECT USING (auth.uid() = user_id OR auth.uid() = friend_id);
CREATE POLICY "friends_insert" ON public.friends FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "friends_update" ON public.friends FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = friend_id);
CREATE POLICY "friends_delete" ON public.friends FOR DELETE USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- ============================================================================
-- DUNGEON INVITES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.dungeon_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dungeon_id TEXT NOT NULL,
  host_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  invited_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.dungeon_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "dungeon_invites_select" ON public.dungeon_invites FOR SELECT USING (auth.uid() = host_id OR auth.uid() = invited_id);
CREATE POLICY "dungeon_invites_insert" ON public.dungeon_invites FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "dungeon_invites_update" ON public.dungeon_invites FOR UPDATE USING (auth.uid() = host_id OR auth.uid() = invited_id);

-- ============================================================================
-- LEADERBOARD VIEW (materialized for performance)
-- ============================================================================
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT 
  id,
  username,
  display_name,
  player_class,
  class_rarity,
  level,
  xp,
  gold,
  streak,
  longest_streak,
  total_tasks_completed,
  total_pomodoro_completed,
  COALESCE(array_length(defeated_mobs, 1), 0) as mobs_killed,
  COALESCE(array_length(completed_dungeons, 1), 0) as dungeons_cleared
FROM public.profiles
ORDER BY xp DESC;

-- ============================================================================
-- AUTO-CREATE PROFILE TRIGGER
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'username', 'player_' || SUBSTR(NEW.id::TEXT, 1, 8)),
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', 'Aventurier')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
