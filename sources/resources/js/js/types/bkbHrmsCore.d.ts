declare namespace Wovosoft.BkbHrmsCore.Models{ 
	export interface Designation {
		id: number;
		name: string;
		bn_name: string;
		created_at: string;
		updated_at: string;
		employees?: Employee[] | null;
		employees_joined_as?: Employee[] | null;
	}

	export interface Employee {
		id: number;
		person_id: number;
		job_id: string;
		joining_date: string;
		joining_designation_id: number;
		designation_id: number;
		job_status: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
		created_at: string;
		updated_at: string;
		person?: Person | null;
		joining_designation?: Designation | null;
		designation?: Designation | null;
	}
}