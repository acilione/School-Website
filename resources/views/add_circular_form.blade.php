<div class="content-block" id="add-circular-form-block">
    <form name="add_circular" method="post">
        <h1>Aggiungi circolare</h1>
        <span class="insert-feedback-message"></span>
        <label for="circular_date">
          <span class="input_error hidden date_error">Data non valida</span>
          <input type="date" name="circular_date" id="circular_date">
        </label>
        <label for="circular_title">
          <span class="input_error hidden" id="circular_title_error">Titolo non valido</span>
          <input type="text" name="circular_title" placeholder="Titolo Circolare">
        </label>
        <label for="circular_content">
          <span class="input_error hidden" id="circular_content_error">Contenuto non valido</span>
          <textarea type="text" name="circular_content" placeholder="Inserisci contenuto"></textarea>
        </label>
        <input type="submit">
    </form>
</div>