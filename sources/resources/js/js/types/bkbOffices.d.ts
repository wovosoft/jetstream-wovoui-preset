declare namespace Wovosoft.BkbOffices.Models{ 
	export interface BaseModel {

	}

	export interface Office {
		id: number;
		name: string;
		bn_name: string;
		code: string;
		extended_code: string;
		hrms_code: string;
		city: string;
		phone: string;
		email: string;
		routing_no: string;
		address: string;
		recommended_manpower: number;
		description: string;
		parent_id: number;
		type: "BR" | "DO" | "DAO" | "RAO" | "RM/CRM" | "CB" | "HO";
		resident_area: "dhaka" | "other_dhaka" | "others";
		created_at: string;
		updated_at: string;
		sbs_code: string;
		district_id: number;
		ctr_branch_name: string;
		type_of?: OfficeType | null;
		contacts?: Contact[] | null;
		children?: Office[] | null;
		parent?: Office | null;
		district?: District | null;
		is_branch: boolean;
		is_corporate_branch: boolean;
		is_div_office: boolean;
		is_dao_office: boolean;
		is_rao_office: boolean;
		is_crm_rm_office: boolean;
		is_head_office: boolean;
	}

	export interface HeadOffice {
		is_branch: boolean;
		is_corporate_branch: boolean;
		is_div_office: boolean;
		is_dao_office: boolean;
		is_rao_office: boolean;
		is_crm_rm_office: boolean;
		is_head_office: boolean;
	}

	export interface Branch {
		crm_rm_office?: CrmRmOffice | null;
		is_branch: boolean;
		is_corporate_branch: boolean;
		is_div_office: boolean;
		is_dao_office: boolean;
		is_rao_office: boolean;
		is_crm_rm_office: boolean;
		is_head_office: boolean;
	}

	export interface DivisionalAuditOffice {
		regional_audit_offices?: RegionalAuditOffice[] | null;
		is_branch: boolean;
		is_corporate_branch: boolean;
		is_div_office: boolean;
		is_dao_office: boolean;
		is_rao_office: boolean;
		is_crm_rm_office: boolean;
		is_head_office: boolean;
	}

	export interface RegionalAuditOffice {
		divisional_audit_office?: DivisionalAuditOffice | null;
		is_branch: boolean;
		is_corporate_branch: boolean;
		is_div_office: boolean;
		is_dao_office: boolean;
		is_rao_office: boolean;
		is_crm_rm_office: boolean;
		is_head_office: boolean;
	}

	export interface Contact {
		id: number;
		office_id: number;
		type: "email" | "phone";
		content: string;
		created_at: string;
		updated_at: string;
	}

	export interface OfficeType {
		id: number;
		name: string;
		bn_name: string;
		description: string;
		type: "BR" | "DO" | "DAO" | "RAO" | "RM/CRM" | "CB" | "HO";
		created_at: string;
		updated_at: string;
		offices?: Office[] | null;
		is_branch: boolean;
		is_corporate_branch: boolean;
		is_div_office: boolean;
		is_dao_office: boolean;
		is_rao_office: boolean;
		is_crm_rm_office: boolean;
		is_head_office: boolean;
	}

	export interface DivisionalOffice {
		crm_rm_offices?: CrmRmOffice[] | null;
		is_branch: boolean;
		is_corporate_branch: boolean;
		is_div_office: boolean;
		is_dao_office: boolean;
		is_rao_office: boolean;
		is_crm_rm_office: boolean;
		is_head_office: boolean;
	}

	export interface CrmRmOffice {
		divisional_office?: DivisionalOffice | null;
		branches?: Branch[] | null;
		is_branch: boolean;
		is_corporate_branch: boolean;
		is_div_office: boolean;
		is_dao_office: boolean;
		is_rao_office: boolean;
		is_crm_rm_office: boolean;
		is_head_office: boolean;
	}
}