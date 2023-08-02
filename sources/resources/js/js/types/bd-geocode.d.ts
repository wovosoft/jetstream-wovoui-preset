declare namespace Wovosoft.BdGeocode.Models{ 
	export interface BaseModel {

	}

	export interface Division {
		id: number;
		name: string;
		bn_name: string;
		url: string;
		created_at: string;
		updated_at: string;
		districts?: District[] | null;
		upazilas?: Upazila[] | null;
	}

	export interface Upazila {
		id: number;
		district_id: number;
		name: string;
		bn_name: string;
		url: string;
		created_at: string;
		updated_at: string;
		division?: Division | null;
		district?: District | null;
		unions?: Union[] | null;
	}

	export interface Union {
		id: number;
		upazila_id: number;
		name: string;
		bn_name: string;
		url: string;
		created_at: string;
		updated_at: string;
		upazila?: Upazila | null;
		district?: District | null;
	}

	export interface District {
		id: number;
		division_id: number;
		name: string;
		bn_name: string;
		lat: string;
		lon: string;
		url: string;
		created_at: string;
		updated_at: string;
		division?: Division | null;
		upazilas?: Upazila[] | null;
		unions?: Union[] | null;
	}
}