

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
	var newsID = [];
	var newspost = [];
	var loadCount = 0;
	posted = true;
	
	var hisRec = [];
	
	//var userRef = firebase.firestore()
	//.collection("users").doc(userID);
	
	//var userData = await userDB.get();
	//var userBook = userData.Bookmarks;
	
	
	setTimeout(loadHistory, 1000)
	
	//var snapshot = await query.get();
	//snapshot.forEach(doc => {
	//	news.push(doc.data());
	//	newsID.push(doc.id);
	//	printNews(doc.data(), doc.id);
		//console.log(doc.data());
		//console.log(doc.id);
	//});
	function loadHistory(){
		console.log(userBook);
		var bookRec = userBook;
		bookRec.forEach(rec => {
		firebase.firestore()
		.collection("NewsArticleData").doc(rec).get().then(function(doc) {
		if (doc.exists) {
			printNews(doc.data(), rec);
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		});
	});
	}
	function printNews(value, ID) {
		$("#timeline").append(
			'<div class="card-div col-6">'
			+ '<div class="card">'
			+ '<div class="card-body">'
			+ '<h5 class="card-title">' + value.Source + '</h5>'
			+ '<h6 class="card-subtitle mb-2 text-muted">' +  new Date(value.publishedDate.seconds*1000) + '</h6>'
			+ '<p class="card-text">' + value.title + '</p>'
			+ '<a href="'+value.link+'" target="_blank" id="views' + ID + '" class="card-link" >View News</a>'
			+ '<a href="#" id="unsave' + ID + '"class="card-link">Unsave News</a>'
			+ '<a href="#" id="likes' + ID + '" class="card-link"><img src="/bootstrap-icons/hand-thumbs-up.svg" alt="" width="20" height="20" title="Like">' + value.likes + '</a>'
			+ '<a href="#" id="dislikes' + ID + '" class="card-link"><img src="/bootstrap-icons/hand-thumbs-down.svg" alt="" width="20" height="20" title="Dislike">' + value.dislikes + '</a>'
			+ '<a href="#" class="card-link"><img src="/bootstrap-icons/eye.svg" alt="" width="20" height="20" title="Views">' + value.views + '</a>'
			+ '</div>'
			+ '</div>'
			+ '</div>'
		);
		document.getElementById ("views" + ID).addEventListener ("click", function () {addView(ID)}, false);
		document.getElementById ("unsave" + ID).addEventListener ("click", function () {removeBook(ID)}, false);
		document.getElementById ("likes" + ID).addEventListener ("click", function () {addLike(ID,value.likes)}, false);
		document.getElementById ("dislikes" + ID).addEventListener ("click", function () {addDislike(ID,value.dislikes)}, false);
	}
	
	async function postnews() {
		if (posted== true) {
			posted = false;
			var lastVisible = snapshot.docs[snapshot.docs.length-1];
			
			var next = query
			.startAfter(lastVisible)
			.limit(5);
			
			snapshot = await next.get();
			snapshot.forEach(doc => {
			news.push(doc.data());
			printNews(doc.data(), doc.id);
			newsID.push(doc.id);
			//console.log(doc.data());
			//console.log(doc.id);
			posted = true;
			});
			console.log(newsID);
		}
	}
	
	function removeBook(article){
	firebase.firestore()
	.collection("users")
	.doc(userID).update({
	Bookmarks: firebase.firestore.FieldValue.arrayRemove(article)
	});
	}
	
	function addView(article){
		firebase.firestore()
		.collection("NewsArticleData")
		.doc(article).update({
		views: firebase.firestore.FieldValue.increment(1)
	});
	firebase.firestore()
	.collection("users")
	.doc(userID).update({
	History: firebase.firestore.FieldValue.arrayUnion(article)
	});
	}
	
	
	function addLike(article, num){
		firebase.firestore()
		.collection("NewsArticleData")
		.doc(article).update({
		likes: firebase.firestore.FieldValue.increment(1)
		});
		var x = num+1;
		document.getElementById ("likes" + article).innerHTML = '<img src="/bootstrap-icons/hand-thumbs-up.svg" alt="" width="20" height="20" title="Like">' + x ;
	}
	
	function addDislike(article, num){
		console.log("proc");
		firebase.firestore()
		.collection("NewsArticleData")
		.doc(article).update({
		dislikes: firebase.firestore.FieldValue.increment(1)
		});
		var x = num+1;
		document.getElementById ("dislikes" + article).innerHTML = '<img src="/bootstrap-icons/hand-thumbs-down.svg" alt="" width="20" height="20" title="Dislike">' + x ;
	}

	$(window).on("scroll", function () {
		var scrollHeight = $(document).height();
		var scrollPosition = $(window).height() + $(window).scrollTop();
		if ((scrollHeight - scrollPosition) / scrollHeight < 0.1) {
			// when scroll to bottom of the page
			//postnews();
		}
	});

	$('[data-toggle="offcanvas"]').click(function () {
		$('#wrapper').toggleClass('toggled');
	});
});