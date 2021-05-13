import axios from "axios";
import "./styles.scss";

const app = new Vue({
	el: "#app",
	data: {
		map: null,
	},
	created: function () {
		axios
			.get("https://map.geoportail.lu/jsapilayers")
			.then((response) => {
				const layers = response.data;
				let layer_names = [];
				let layer_visibilities = [];
				let layer_opacity = [];
				for (let element in layers) {
					layer_names.push(layers[element].name);
					layer_visibilities.push(false);
					layer_opacity.push(0.5);
				}
				this.map = new lux.Map({
					target: "map",
					bgLayer: "blank",
					zoom: 11,
					position: [75977, 75099],
					layers: layer_names,
					layerVisibilities: layer_visibilities,
					layerOpacities: layer_opacity,
					layerManager: {
						target: "layers",
					},
					mousePosition: {
						target: "coordinates",
						srs: 2169,
					},
					search: {
						target: "search",
					},
				});
			})
			.catch((e) => console.log(e));
	},
	mounted: function () {
		//document.getElementById("search").firstChild.style.background = "red";
	},
	methods: {},
});
