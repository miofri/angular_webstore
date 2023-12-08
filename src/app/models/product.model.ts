export interface Product {
	id: string;
	title: string;
	description: string;
	images: string[];
	name: string;
	price: number;
	category: {
		id: 1;
		name: string;
		image: string;
	};
}
