<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


$router->get('/', function () use ($router) {
    return $router->app->version();
});


$router->group(['prefix' => 'api'], function () use ($router){
    $router->get('project', 'ProjectController@show');
    $router->post('project', 'ProjectController@create');
    $router->get('project/{id}', 'ProjectController@getDataByID');
    $router->put('project/{id}', 'ProjectController@update');
    $router->delete('project/{id}', 'ProjectController@delete');
    $router->post('searchProject', 'ProjectController@search');
    $router->delete('projectall', 'ProjectController@deleteAll');
    
    $router->get('client', 'ClientController@show');
});
