import { LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function UserMenu() {
  const { user, signOut } = useAuth();
  if (!user) return null;

  const name = user.user_metadata?.full_name ?? user.email ?? 'Account';
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;

  return (
    <div className="user-menu">
      <div className="user-menu__avatar" aria-hidden="true">
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="user-menu__img" />
        ) : (
          <span className="user-menu__initial">{name.charAt(0).toUpperCase()}</span>
        )}
      </div>
      <span className="user-menu__name">{name}</span>
      <button type="button" className="user-menu__logout" onClick={signOut} aria-label="Log out">
        <LogOut className="user-menu__logout-icon" strokeWidth={1.5} aria-hidden="true" />
        <span>Log out</span>
      </button>
    </div>
  );
}
