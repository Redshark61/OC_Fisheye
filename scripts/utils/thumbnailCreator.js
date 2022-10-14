/**
 * @param {string} video
 */
export default (video) => {
	var $canvas = document.createElement("canvas");

	var $ctx = $canvas.getContext("2d");
	var $video = document.createElement("video");
	var $source = document.createElement("source");
	$source.src = video;
	$video.style.display = "none";
	$video.appendChild($source);
	document.body.appendChild($video);

	// Load the video and show it
	$video.load();

	// Load metadata of the video to get video duration and dimensions

	$video.addEventListener("canplay", function () {
		$canvas.style.display = "inline";
		$canvas.width = $video.videoWidth;
		$canvas.height = $video.videoHeight;
		$ctx.drawImage($video, 0, 0, $video.videoWidth, $video.videoHeight);
		$canvas.className = "gallery-image";
	});

	return $canvas;
};
