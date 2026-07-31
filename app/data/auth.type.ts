export type AuthModule = {
  id: string;
  name: string;
  slug: string;
  appSlug: string;
};

export type AuthUser = {
  id: string;
  name: string;
  cpf: string;
  isAdmin: boolean;
  active: boolean;
  modules: AuthModule[];
  sessionId?: string;
  expiresAt?: string;
};

export type LoginResponse = {
  sessionId: string;
  expiresAt: string;
  user: AuthUser;
  app: {
    id: string;
    slug: string;
    name: string;
    clientId: string;
  };
};
