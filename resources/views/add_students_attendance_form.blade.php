<div class='content-block' id='add-students-attendance-form-block'>
    <span class="insert-feedback-message"></span>  
    <form name="add_student_attendance" method='post'>
        <label>Numero classe
            <select name="student_attending_class_num" id="student_attending_class_num"></select>
        </label>
        <label>Sezione
            <select name="student_attending_class_section" id="student_attending_class_section"></select>
        </label>
        <label>Studente
            <select name="student_attending" id="student_attending"></select>
        </label>
        <label>Data
            <span class='input_error hidden date_error'>data non valida</span>
            <input type="date" name="attendance_date">
        </label>
        <label>Presenza
            <select name="attendance_value" id="attendance_value">
                <option value="A">A</option>
                <option value="P">P</option>
            </select>
        </label>
        <input type="submit">
    </form>
</div>