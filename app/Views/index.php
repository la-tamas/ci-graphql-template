<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<title>My Images</title>
		<meta name="description" content="Order and sort personal images">
		<meta name="viewport" content="initial-scale=1, width=device-width" />
		<link rel="shortcut icon" type="image/png" href="/favicon.ico"/>
		<base href="/"/>
        <!-- CSS -->
        <link rel="stylesheet" href="./css/index.css" />
		<!-- SCRIPTS -->
        <script crossorigin defer src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
        <script crossorigin defer src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
		<script defer src="dist/runtime.app.js"></script>
		<script defer src="dist/modules.app.js"></script>
		<script defer src="dist/main.app.js"></script>
        <script>
			let appRoot
			window.onload = function() {
				appRoot = window.App.library.create('root')
			}
			window.onclose = function() {
				window.App.library.delete(appRoot)
			}
		</script>
		<!-- --> 
	</head>
	<body>
		<div id="root"></div>
	</body>
</html>