<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;

    class Student extends Model
    {
        public $timestamps = false;

        protected $table = 'alunno';

        protected $hidden = [
            'password'
        ];
        public function class() {
            return $this->belongsTo(StudentClass::class, 'classe');
        }
        public function attendances() {
            return $this->hasMany(StudentAttendance::class, 'alunno');
        }
        public function grades() {
            return $this->hasMany(StudentGrade::class, 'alunno');
        }
        public function messages() {
            return $this->hasMany(StudentClassMessage::class, 'id_studente');
        }
    }
?>