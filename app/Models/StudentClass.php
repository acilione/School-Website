<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentClass extends Model
{
    public $timestamps = false; 
    
    protected $table = 'classe';

    public function students() {
        return $this->hasMany(Student::class, 'classe');
    }
    public function teachings() {
        return $this->hasMany(Teaching::class, 'classe');
    }
}
?>