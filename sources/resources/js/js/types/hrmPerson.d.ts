declare namespace Wovosoft.HrmsPerson.Models{ 
	export interface FamilyMember {
		id: number;
		person_id: number;
		relation: string;
		related_person: number;
		created_at: string;
		updated_at: string;
		person?: FamilyMember | null;
	}

	export interface Address {
		id: number;
		person_id: number;
		type: "present" | "permanent";
		division_id: number;
		district_id: number;
		upazila_id: number;
		union_id: number;
		village: string;
		word: string;
		road: string;
		phone: string;
		email: string;
		created_at: string;
		updated_at: string;
		person?: Person | null;
		division?: Division | null;
		district?: District | null;
		upazila?: Upazila | null;
		union?: Union | null;
	}

	export interface Person {
		id: number;
		name: string;
		bn_name: string;
		dob: string;
		gender: "m" | "f" | "o";
		religion: "h" | "i" | "c" | "b" | "e" | "o";
		marital_status: "s" | "m" | "d" | "lt" | "o";
		blood_group: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
		created_at: string;
		updated_at: string;
		addresses?: Address[] | null;
		family_members?: Person[] | null;
		identifications?: Identification[] | null;
		academic_information?: AcademicInformation[] | null;
		contacts?: Contact[] | null;
		work_histories?: WorkHistory[] | null;
	}

	export interface Contact {
		id: number;
		person_id: number;
		type: string;
		label: string;
		company: string;
		department: string;
		relation: string;
		created_at: string;
		updated_at: string;
		person?: Person | null;
	}

	export interface AcademicInformation {
		id: number;
		person_id: number;
		university_id: number;
		exam: "psc" | "jsc" | "ssc" | "hsc" | "graduation" | "post_graduation";
		result_type: "division" | "gpa" | "cgpa";
		result: number;
		passing_year: number;
		session: string;
		board_id: number;
		academic_discipline_id: number;
		created_at: string;
		updated_at: string;
		person?: Person | null;
		university?: University | null;
	}

	export interface WorkHistory {
		id: number;
		person_id: number;
		from: string;
		to: string;
		is_departmental: boolean;
		prev_work_history_id: number;
		info_type: string;
		info_id: number;
		created_at: string;
		updated_at: string;
		person?: Person | null;
		info?: any;
	}

	export interface DepartmentalWorkHistory {
		id: number;
		work_history_id: number;
		office_id: number;
		designation_id: number;
		comment: string;
		created_at: string;
		updated_at: string;
		work_history?: WorkHistory | null;
	}

	export interface Identification {
		id: number;
		person_id: number;
		type: string;
		number: string;
		issue_date: string;
		expiry_date: string;
		issuing_country: string;
		created_at: string;
		updated_at: string;
		person?: Person | null;
	}

	export interface NonDepartmentalWorkHistory {
		id: number;
		work_history_id: number;
		institution_id: number;
		designation: string;
		posting_office: string;
		comment: string;
		created_at: string;
		updated_at: string;
		work_history?: WorkHistory | null;
	}
}