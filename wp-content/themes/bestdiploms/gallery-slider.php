<?php 
<ul class="slider">
<?php
foreach ($images as $image) {
  $src = wp_get_attachment_url($image->ID); // ссылка на изображение
  $alt = get_post_meta($image->ID, '_wp_attachment_image_alt', true); // атрибут alt
?>
  <li><img src="<?php echo $src; ?>" alt="<?php echo $alt; ?>" /></li>
<?php } ?>
</ul>
