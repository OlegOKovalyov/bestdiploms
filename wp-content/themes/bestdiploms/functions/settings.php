<?php
/**
 * Собственная страница настроек в админ-панели WordPress
 * ( Контакты: телефон, e-mail; Социальные сети: Facebook, VКонтакте,
 * Twitter; Код в footer.php )
 * Автор: Дмитрий Вермутов
 * Источник: http://www.onwordpress.ru/stranicu-nastroek-temy-v-adminku-wordpress.html
 * Версия: 2017.01.21
 * Лицензия: MIT
 */

class ControlPanel {
// Устанавливаем значения по умолчанию
var $default_settings = array(
 'phone1' => ' 8-800 511-71-60',
 'phone-1' => '88005117160',
 'phone2' => '+7-926-631-81-76',
 'phone-2' => '+79266318176',
 'email' => 'bestdiplomy@gmail.com'
 );
 var $options;

 function ControlPanel() {
 add_action('admin_menu', array(&$this, 'add_menu'));
 if (!is_array(get_option('themadmin')))
 add_option('themadmin', $this->default_settings);
 $this->options = get_option('themadmin');
 }

 function add_menu() {
 add_theme_page('WP Theme Options', 'Опции темы', 8, "themadmin", array(&$this, 'optionsmenu'));
 }

 // Сохраняем значения формы с настройками 
 function optionsmenu() {
 if ($_POST['ss_action'] == 'save') {
 $this->options["phone1"] = $_POST['cp_phone1'];
 $this->options["phone-1"] = $_POST['cp_phone-1'];
 $this->options["phone2"] = $_POST['cp_phone2'];
 $this->options["phone-2"] = $_POST['cp_phone-2'];
 $this->options["email"] = $_POST['cp_email'];
 $this->options["facebook"] = $_POST['cp_facebook'];
 $this->options["vkontakte"] = $_POST['cp_vkontakte'];
 $this->options["twitter"] = $_POST['cp_twitter'];
 $this->options["metrika"] = $_POST['cp_metrika'];
 update_option('themadmin', $this->options);
 echo '<div class="updated fade" id="message" style="background-color: rgb(255, 251, 204); width: 400px; margin-left: 17px; margin-top: 17px;"><p>Ваши изменения <strong>сохранены</strong>.</p></div>';
 }
 // Создаем форму для настроек
 echo '<form action="" method="post" class="themeform">';
 echo '<input type="hidden" id="ss_action" name="ss_action" value="save">';

 print '<div class="cptab"><br />
 <b>Настройки темы</b>
 <br />
 <h3>Контакты</h3>
 <p><input placeholder="Телефон" style="width:300px;" name="cp_phone1" id="cp_phone1" value="'.$this->options["phone1"].'"><label> - телефон на странице сайта</label></p>
 <p><input placeholder="Телефон для дозвона" style="width:300px;" name="cp_phone-1" id="cp_phone-1" value="'.$this->options["phone-1"].'"><label> - телефон для дозвона</label></p>
 <p><input placeholder="Телефон" style="width:300px;" name="cp_phone2" id="cp_phone2" value="'.$this->options["phone2"].'"><label> - телефон на странице сайта</label></p>
 <p><input placeholder="Телефон для дозвона" style="width:300px;" name="cp_phone-2" id="cp_phone-2" value="'.$this->options["phone-2"].'"><label> - телефон для дозвона</label></p>
 <p><input placeholder="Email" style="width:300px;" name="cp_email" id="cp_email" value="'.$this->options["email"].'"><label> - email</label></p>
 <h3>Социальные сети</h3>
 <p><input placeholder="Ссылка на страницу facebook" style="width:300px;" name="cp_facebook" id="cp_facebook" value="'.$this->options["facebook"].'"><label> - facebook</label></p>
 <p><input placeholder="Ссылка на страницу vkontakte" style="width:300px;" name="cp_vkontakte" id="cp_vkontakte" value="'.$this->options["vkontakte"].'"><label> - vkontakte</label></p>
 <p><input placeholder="Ссылка на страницу twitter" style="width:300px;" name="cp_twitter" id="cp_twitter" value="'.$this->options["twitter"].'"><label> - twitter</label></p>

 <h3>Код в footer.php</h3>
 <p><textarea placeholder="Здесь можно прописать коды счетчиков или дополнительных скриптов" style="width:300px;" name="cp_metrika" id="cp_metrika">'.stripslashes($this->options["metrika"]).'</textarea><label> - здесь можно прописать коды счетчиков или дополнительных скриптов</label></p>

 </div><br />';
 echo '<input type="submit" value="Сохранить" name="cp_save" class="dochanges" />';
 echo '</form>';
 }
}
$cpanel = new ControlPanel();
$mytheme = get_option('themadmin');
?>