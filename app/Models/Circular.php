<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Circular extends Model
{
    protected $table = 'circolare';
    public $timestamps = false; 

    protected $hidden = [
        'id',
        'created_at'
    ];
    public function filteredCirculars($searchValue)
    {
        return $this->where('contenuto', 'like', '%'.$searchValue.'%')
        ->orWhere('titolo', 'like', '%'.$searchValue.'%')
        ->orWhere('data', 'like', '%'.$searchValue.'%')
        ->get();
    }
}
?>