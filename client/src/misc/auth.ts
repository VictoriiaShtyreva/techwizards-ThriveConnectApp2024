export enum AuthRoles {
   company,
   jobseeker,
}

export type Auth = {
   role: AuthRoles;
   email: string;
   password: string;
}