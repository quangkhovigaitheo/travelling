<!DOCTYPE html>
<html>
<head>
  <title>Slick Playground</title>
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css"/>
<!-- Add the slick-theme.css if you want default styling -->
<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick-theme.css"/>
  <style type="text/css">
    html, body {
      margin: 0;
      padding: 0;
    }
    * {
      box-sizing: border-box;
    }
    .slider {
        width: 50%;
        margin: 100px auto;
    }
    .slick-slide {
      margin: 0px 20px;
    }
    .slick-slide img {
      width: 100%;
    }
    .slick-prev:before,
    .slick-next:before {
        color: black;
    }
  </style>
</head>
<body>

    <section class="regular slider">
      <div>
        <img src="http://placehold.it/350x300?text=1">
      </div>
      <div>
        <img src="http://placehold.it/350x300?text=2">
      </div>
      <div>
        <img src="http://placehold.it/350x300?text=3">
      </div>
      <div>
        <img src="http://placehold.it/350x300?text=4">
      </div>
      <div>
        <img src="http://placehold.it/350x300?text=5">
      </div>
      <div>
        <img src="http://placehold.it/350x300?text=6">
      </div>
    </section>

  

  <script src="https://code.jquery.com/jquery-2.2.0.min.js" type="text/javascript"></script>
  <script type="text/javascript" src="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js"></script>
  <script type="text/javascript">
    $(document).on('ready', function() {
      $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
      });
      console.log('rudddd');
    });
  </script>

</body>
</html>