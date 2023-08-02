declare namespace Wovosoft.BdAcademicComponents.Models{ 
	export interface AcademicBoard {
		id: number;
		created_at: string;
		updated_at: string;
	}

	export interface University {
		id: number;
		name: string;
		bn_name: string;
		code: string;
		website: string;
		details: string;
		type: string;
		logo: string;
		created_at: string;
		updated_at: string;
	}

	export interface AcademicDiscipline {
		id: number;
		name: string;
		bn_name: string;
		category: string;
		description: string;
		created_at: string;
		updated_at: string;
	}
}