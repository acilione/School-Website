<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WeekDay extends Model
{
    public $timestamps = false; 
    
    protected $table = 'giorni_settimana';

    public function teachings() {
        return $this->hasMany(Teaching::class, 'giorno_settimana');
    }
}
?>