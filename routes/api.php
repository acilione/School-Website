<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/list_circulars', [HomeController::class, 'listCirculars']);
Route::get('/list_buildings', [HomeController::class, 'listBuildings']);
Route::get('/list_active_teachers', [HomeController::class, 'listActiveTeachers']);

Route::post('/list_search_results', [HomeController::class, 'listSearchResult']);

?>