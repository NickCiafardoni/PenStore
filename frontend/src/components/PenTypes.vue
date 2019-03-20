<template>
    <div>
		<h1>Pen Types</h1>
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th>id</th>
					<th>Name</th>
					<th>Colors</th>
					<th>Max Lines</th>
					<th>Max Chars/Line</th>
				</tr>
			</thead>
			<tbody>

				<tr v-for="penType in penTypes">

					<th></th>

					<td></td>

				</tr>
			</tbody>
		</table>
    </div>
</template>
<script>
import {APIService} from '../APIService';
const API_URL = 'http://localhost:3000';

const apiService = new APIService();

export default {
	name: 'ListPenTypes',
	components: {
	},
	data() {
		return {
			penTypes: [],
			numberOfPenTypes:0
		};
	},
	methods: {
		getPenTypes(){
			apiService.getPenTypes().then((data) => {
				this.penTypes = data.data;
				this.numberOfPenTypes = data.count;
			});
		},	
	},
	mounted() {
		this.getPenTypes();
	},
}

</script>

<style scoped>

.list-horizontal li {
	display:inline-block;
}

.list-horizontal li:before {
	content: '\00a0\2022\00a0\00a0';
	color:#999;
	color:rgba(0,0,0,0.5);
	font-size:11px;
}

.list-horizontal li:first-child:before {
	content: '';
}

</style>