<?php

namespace App\Http\Controllers;
use App\Models\Client;

class ClientController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    //

    public function show()
    {

        $client = Client::all();
                            

        if($client){
            $result = [
                "data" => $client,
                "status"=> 200
            ];
        }else{
            $result = [
                "message" => "Data not Found",
                "status" => 400
            ];
        }

        return response()->json($result['data'], $result['status']);
    }
}
