<div class="content-block" id="view-workers-block">
    <h2>aggiungi lavoratore</h2>
    <input type="text" name="rows_filter_search" id="workers-rows-filter-bar" placeholder="Filter Workers">
    <select name="filter_value" id="workers-filter-options"></select>
    <a class='btn' id="modify-worker-btn">Modifica</a>
    <div id='workers-table-block'></div>
    <span class="insert-feedback-message"></span>  
    <form name="modify_worker" method="post">
        <label>ID 
            <input name="id" readonly>
        </label>
        <label>Codice Fiscale
          <span class='input_error hidden cf_error'>formato cf errato</span>
          <span class='input_error hidden cf_taken_error'>cf gia' utilizzato</span>
          <input type="text" name="cf" />
        </label>
        <label>Nome
          <span class='input_error hidden name_error'>formato nome errato</span>
          <input type="text" name="name" />
        </label>
        <label>Cognome
          <span class='input_error hidden surname_error'>formato cognome errato</span>
          <input type="text" name="surname" />
        </label>
        <label>Email
          <span class='input_error hidden email_error'>formato email errato</span>
          <span class='input_error hidden email_taken_error'>email gia' utilizzata</span>
          <input type="email" name="email">
        </label>
        <label>Data Nascita
          <span class='input_error hidden date_error'>formato data errato</span>
          <input type="date" name="date" />
        </label>
        <label>Sesso
        <select name="sex">
            <option value="M">M</option>
            <option value="F">F</option>
        </select>
        </label>
        <label>Ruolo
        <select name="role">
            <option value="preside">preside</option>
            <option value="segretario">segretario</option>
            <option value="docente">docente</option>
        </select>
        </label>
        <label>Data Inizio Lavoro
          <span class='input_error hidden beginning_date_error'>formato data errato</span>
          <input type="date" name="beginning_date" />
        </label>
        <label>Url immagine del profilo
              <input type="text" name="profile_img">
        </label>
        <label>&nbsp;<input type="submit" /></label>
    </form>
</div>