<div class="content-block" id="add-worker-form-block">
    <h2>aggiungi lavoratore</h2>
    <span class="insert-feedback-message"></span>  
    <form name="add_worker" method="post">
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
        <label>Password
          <span class='input_error hidden password_error'>formato password errato</span>
          <input type="hidden" name="password">
        </label>
        <label>Data Nascita
          <span class='input_error hidden date_error'>formato data errato</span>
          <input type="date" name="date" />
        </label>
        <select name="sex" id="sex">
            <option value="M">M</option>
            <option value="F">F</option>
        </select>
        <select name="role" id="role">
            <option value="preside">preside</option>
            <option value="segretario">segretario</option>
            <option value="docente">docente</option>
        </select>
        <label>Data Inizio Lavoro
          <span class='input_error hidden' id='beginning_date_error'>formato data errato</span>
          <input type="date" name="beginning_date" />
        </label>
        <label>Url immagine del profilo
              <input type="text" name="profile_img">
        </label>
        <label>&nbsp;<input type="submit" /></label>
    </form>
</div>