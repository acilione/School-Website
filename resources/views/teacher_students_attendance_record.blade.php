<div class='content-block' id='teacher-students-attendance-record-block'>
    <input type="text" name="rows_filter_search" id="attendance-rows-filter-bar" placeholder="Filter Attendance">
    <select name="filter_value" id="attendance-filter-options"></select>
    <a class='btn hidden' id="modify-student-attendance-btn">Modifica</a>
    <label>Numero classe
        <select name="student_class_num" id="student-view-attendance-class-num"></select>
    </label>
    <label>Sezione
        <select name="student_class_section" id="student-view-attendance-class-section"></select>
    </label>
    <label>Studente
        <select name="student_to_view_attendance" id="student-to-view-attendance-record"></select>
    </label>
    <div id='attendance-table-block'></div>
    <span class="insert-feedback-message"></span>
    <form name="modify_student_attendance" method="post">
        <label>ID
            <input name='student_modify_attendance_ID' type="text" readonly>
        </label>
        <label>Data
            <input name='student_modify_attendance_date' type="date" readonly>
        </label>
        <label>Presenza
            <select name="student_modify_attendance_value">
                <option value="P">P</option>
                <option value="A">A</option>
            </select>
        </label>
        <input type="submit">
</div>