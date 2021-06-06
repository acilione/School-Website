<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentClassMessage extends Model
{
    protected $table = 'messaggi_studenti';

    public function student()
    {
        return $this->belongsTo(StudentClass::class, 'id_studente');
    }
}
?>