<div class='content-block' id='view-students-block'>
    <h2>visualizza studenti</h2>
    <input type="text" name="rows_filter_search" id="students-rows-filter-bar" placeholder="Filter Students">
    <select name="filter_value" id="students-filter-options"></select>
    <a class='btn' id="modify-student-btn">Modifica</a>
    <div id='students-table-block'></div>
    <form name="modify_student" method="post">
        <span class="insert-feedback-message"></span>  
        <label>ID 
            <input name="student_id" readonly>
        </label>
        <label>
          Codice Fiscale 
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
        <select name="sex">
            <option value="M">M</option>
            <option value="F">F</option>
        </select>
        <select name="class_num">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <select name="class_section">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
        </select>
        <label>&nbsp;<input type="submit" /></label>
    </form>
</div>