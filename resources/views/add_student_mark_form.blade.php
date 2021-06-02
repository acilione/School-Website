<div class='content-block' id='add-student-mark-form-block'>
    <h2>Aggiungi voto</h2>
    <span class="insert-feedback-message"></span>  
    <form name="add_mark" method='post'>
      <label>Numero classe
        <select name="student_to_grade_class_num" id="student_to_grade_class_num"></select>
      </label>
      <label>Sezione
        <select name="student_to_grade_class_section" id="student_to_grade_class_section"></select>
      </label>
      <label>Studente
        <select name="student_to_grade" id="student_to_grade"></select>
      </label>
      <label>Disciplina
        <select name="subject" id="subject"></select>
      </label>
      <label>Data
        <span class='input_error hidden date_error'>data non valida</span>
        <input type="date" name="grade_date">
      </label>
      <label>Voto
        <select name="mark" id="mark">
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
        </label>
      </select>
      <label>Tipologia voto
        <select name="mark_type" id="mark_type">
          <option value="scritto">scritto</option>
          <option value="orale">orale</option>
        </select>
      </label>
      <input type="submit">
    </form>
</div>