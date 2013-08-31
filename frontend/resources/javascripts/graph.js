function getData() {
	return jQuery.parseJSON( $.ajax({
			type: "GET",
			url: 'data.json',
			async: false,
		}).responseText );
}

function render( container ) {

	var graph = Viva.Graph.graph();

	var data = getData();

	console.log( data );

	for( gem in data ) {
//		console.log( gem );
		for ( dependency in data[gem] ) {
			graph.addLink( gem, data[gem][dependency] );
		};
	};

	var graphics = Viva.Graph.View.svgGraphics();

	graphics.node(function(node) {

		return Viva.Graph.svg('image')
		.attr( 'width', 32 )
		.attr( 'height', 32 )
		.attr( 'class', 'gem' )
		.attr( 'id', node.id )
		.link( 'gem.png' );

	});

	graphics.placeNode(function(nodeUI, pos) {
		nodeUI.attr('x', pos.x - 12).attr('y', pos.y - 12);
	});

	var renderer = Viva.Graph.View.renderer(graph, { graphics: graphics, container: container });

	renderer.run();

	var informationPanel = $( '#info h3' )[0];

	console.log( informationPanel );

	$('.gem').hover( function( event ) {
					var obj = event.target;
					informationPanel.textContent = obj.id;
				});

}

