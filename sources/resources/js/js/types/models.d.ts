declare namespace App.Models{ 
	export interface Office {

	}

	export interface UserRole {
		id: number;
		user_id: number;
		role_id: number;
		created_at: string;
		updated_at: string;
		user?: User | null;
		role?: Role | null;
	}

	export interface RolePermission {
		id: number;
		role_id: number;
		permission_id: number;
		created_at: string;
		updated_at: string;
		role?: Role | null;
		permission?: Permission | null;
	}

	export interface Role {
		id: number;
		name: string;
		created_at: string;
		updated_at: string;
		permissions?: Permission[] | null;
		permission_assignments?: RolePermission[] | null;
	}

	export interface User {
		id: number;
		name: string;
		email: string;
		email_verified_at: string;
		password: string;
		remember_token: string;
		current_team_id: number;
		profile_photo_path: string;
		office_id: number;
		created_at: string;
		updated_at: string;
		two_factor_secret: string;
		two_factor_recovery_codes: string;
		two_factor_confirmed_at: string;
		roles?: Role[] | null;
		role_assignments?: UserRole[] | null;
		profile_photo_url: unknown;
		permissions: unknown;
	}

	export interface Permission {
		id: number;
		name: string;
		created_at: string;
		updated_at: string;
		roles?: Role[] | null;
		role?: Role | null;
	}
}