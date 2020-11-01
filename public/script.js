var firebaseConfig = {
	apiKey: "AIzaSyAQPAqzqDgY-ySsmEakXlyTo8BjbR7QKwM",
	authDomain: "my-news-network-15401.firebaseapp.com",
	databaseURL: "https://my-news-network-15401.firebaseio.com",
	projectId: "my-news-network-15401",
	storageBucket: "my-news-network-15401.appspot.com",
	messagingSenderId: "100486016337",
	appId: "1:100486016337:web:5a9a185b0a8797e1423770",
	measurementId: "G-SS97Q9PSGK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(async function () {
	var trigger = $('.hamburger'),
		overlay = $('.overlay'),
		isClosed = false;

	trigger.click(function () {
		hamburger_cross();
	});

	function hamburger_cross() {

		if (isClosed == true) {
			overlay.hide();
			trigger.removeClass('is-open');
			trigger.addClass('is-closed');
			isClosed = false;
		} else {
			overlay.show();
			trigger.removeClass('is-closed');
			trigger.addClass('is-open');
			isClosed = true;
		}
	}

	var news = [];
	var newspost = [];
	var loadCount = 0;

	const docRef = firebase.firestore()
		.collection("NewsArticles");

	const snapshot = await docRef.get();
	snapshot.forEach(doc => {
		news.push(doc.data());
	});

	news.forEach(printNews);



	function printNews(value) {
		newspost.push(
			'<div class="card">'
			+ '<div class="card-body">'
			+ '<h5 class="card-title">' + value.source + '</h5>'
			+ '<h6 class="card-subtitle mb-2 text-muted">' + value.publishedDate + '</h6>'
			+ '<p class="card-text" id="news1">' + value.title + '</p>'
			+ '<a href="' + value.link + '" class="card-link">Card link</a>'
			+ '<a href="#" class="card-link">Another link</a>'
			+ '</div>'
			+ '</div>'
		);
	}

	var newsCount = 0;

	for (newsCount = 0; newsCount < 6; newsCount++) {
		$("#timeline").append(newspost[newsCount]);
	}


	function postnews() {
		var i = 0;
		for (i = 0; i < 4; i++)
			$("#timeline").append(newspost[newsCount + i]);
		newsCount += i;
	}

	$(window).on("scroll", function () {
		var scrollHeight = $(document).height();
		var scrollPosition = $(window).height() + $(window).scrollTop();
		if ((scrollHeight - scrollPosition) / scrollHeight < 0.1) {
			// when scroll to bottom of the page
			postnews();
		}
	});

	/* newspost.forEach(pNews);
	function pNews(value) {
		$("#timeline").append(value);
	} */

	/* $("#timeline").infiniteScroll({
	  // options
	  path: '',
	  append: '.card',
	  history: false,
	});
	
	
	$("#timeline").on( 'load.infiniteScroll', postnews );
	 */


	/* var nextPenSlugs = [
  '3d9a3b8092ebcf9bc4a72672b81df1ac',
  '2cde50c59ea73c47aec5bd26343ce287',
  'd83110c5f71ea23ba5800b6b1a4a95c4',
	];

	function getPenPath() {
	  var slug = nextPenSlugs[ this.loadCount ];
	  if ( slug ) {
		return 'https://s.codepen.io/desandro/debug/' + slug;
	  }
	}
	
	var $container = $("#timeline").infiniteScroll({
	  path: getPenPath,
	  append: '.post',
	  status: '.page-load-status',
	});
	
	$container.infiniteScroll('appendItems', newspost); */


	/* var news = document.getElementById('news1');
	
	docRef = firebase.firestore()
	.collection("NewsArticles")
	.doc("ABElyp3icaUVUz8mZKBF");
		
	docRef.get().then(function(doc) {
		if (doc.exists) {
			news.innerHTML = doc.data().title;
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});
	
	news.innerHTML = query.title; */



	/*additional JS */



	$('[data-toggle="offcanvas"]').click(function () {
		$('#wrapper').toggleClass('toggled');
	});
});