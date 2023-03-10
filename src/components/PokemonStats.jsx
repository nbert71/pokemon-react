import React from "react";
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function PokemonStats(props) {
	const options = {};
	const data = {
		labels: ["hp", "atk", "def", "spe_atk", "spe_def", "vit"],
		datasets: [
			{
				data: props.stats,
				backgroundColor: [
					"#ff595e",
					"#ffca3a",
					"#8ac926",
					"#ff6a3a",
					"#5A8219",
					"#1982C4",
					"#6A4C93",
				],
			},
		],
	};
	return <Bar data={data} style={{ width: "100%" }} />;
}

export default PokemonStats;
