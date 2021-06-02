<div class='content-block' id='teacher-students-grades-record-block'>
    <input type="text" name="rows_filter_search" id="grades-rows-filter-bar" placeholder="Filter Grades">
    <select name="filter_value" id="filter-options"></select>
    <a class='btn hidden' id="modify-student-grade-btn">Modifica</a>
    <label>Numero classe
        <select name="student_class_num" id="student-view-grades-class-num"></select>
    </label>
    <label>Sezione
        <select name="student_class_section" id="student-view-grades-class-section"></select>
    </label>
    <label>Studente
        <select name="student_attending" id="student-to-view-grades-record"></select>
    </label>
    <label>Disciplina
        <select name="subject" id="subject-view-grades"></select>
    </label>
    <div id='grades-table-block'></div>
    <span class="insert-feedback-message"></span>
    <form name="modify_student_grade" method="post">
        <label>ID
            <input name='student_modify_grade_ID' type="text" readonly>
        </label>
        <label>Nome
            <input name='student_modify_grade_name' type="text" readonly>
        </label>
        <label>Cognome
            <input name='student_modify_grade_surname' type="text" readonly>
        </label>
        <label>Disciplina
            <input name='student_modify_grade_subject' type="text" readonly>
        </label>
        <label>Data
            <input name='student_modify_grade_date' type="date" readonly>
        </label>
        <label>Tipologia voto
            <input name='student_modify_grade_mark_type' type="text" readonly>
        </label>
        <label>Voto
            <select name="selection_modify_grade">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </label>
        <input type="submit">        
    </form>
</div>