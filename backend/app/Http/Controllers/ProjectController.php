<?php

namespace App\Http\Controllers;
use App\Models\Project;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ProjectController extends Controller
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

        $project = Project::join('tb_m_client', 'tb_m_project.client_id', '=', 'tb_m_client.client_id')
                        ->select('tb_m_project.*','tb_m_client.*')
                        ->get();
                            

        if($project){
            $result = [
                "data" => $project,
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

    public function search(Request $request)
    {

        $project_name = $request->project_name;
        $client_id = $request->client_id;
        $project_status = $request->project_status;

        error_log($project_name);

        if($project_name == null ){
            
        } 


        $project = Project::join('tb_m_client', 'tb_m_project.client_id', '=', 'tb_m_client.client_id')
                ->where('tb_m_project.project_name', '=',$project_name) 
                ->orWhere('tb_m_project.client_id', '=', $client_id)
                ->orWhere('tb_m_project.project_status', '=', $project_status)
                ->get();

        if(count($project) == 0){
            $result =[
                "message" => "data not found",
                "status" => 400
            ];
            
        }else{
            $result = [
                "data" => $project,
                "status" => 200
            ];
        }

        return response()->json($result, $result['status']);
    }

    public function getDataByID($id){
        $project_id = $id;

        $project = Project::join('tb_m_client', 'tb_m_project.client_id', '=', 'tb_m_client.client_id')
                ->where('tb_m_project.project_id', '=',$project_id) 
                ->get();

        if(count($project) == 0){
            $result =[
                "message" => "data not found",
                "status" => 400
            ];
            
        }else{
            $result = [
                "data" => $project,
                "status" => 200
            ];
        }

        return response()->json($result, $result['status']);
    }

    public function create(Request $request)
    {

        error_log($request);

        $currentTime = Carbon::now()->format('Y-m-d');

        $project = Project::create([
            'project_name' => $request->project_name,
            'client_id' =>$request->client_id,
            'project_start' => $currentTime,
            'project_end' =>Carbon::now()->addMonth($request->project_end)->format('Y-m-d'),
            'project_status' =>$request->project_status,
        ]);

        if($project){
            $result = [
                "message" => "data has been created",
                "data" => $project,
                "status" => 200
            ];
        }else{
            $result = [
                "message" => "data failed created",
                "status" => 400
            ];
        }

        

        return response()->json($result, $result['status']);
    }

    public function update($id, Request $request)
    {
        error_log($id);
        $project = Project::where(["project_id" =>$id]);

        if(!$project){
            $result = [
                "message" => "data not found",
                "status" => 400
            ];

            return response()->json($result, $result['status']);
        }

        $project->update([
            "project_name" => $request->project_name,
            "client_id" => $request->client_id,
            "project_status" => $request->project_status
        ]);

        $result = [
            "message" => "data has been updated",
            "data" => $project,
            "status" => 200
        ];
        
        return response()->json($result, $result['status']);

    }

    public function delete($id)
    {
        $project = Project::where(['project_id' => $id]);

        if($project){
            
            $project->delete();
            $result = [
                "message" => "data deleted",
                "status" => 200
            ];

        }else{
            $result =[
                "message" => "data not found",
                "status" => 400
            ];
        }

        return response()->json($result, $result['status']);
    }
    public function deleteAll(Request $request){
        $ids = $request->ids;

        $project = Project::whereIn('project_id', explode(",", $ids))->delete();

        if($project){
            $result=[
                "message" => "data deleted",
                "status" => 200 
            ];
        }else{
            $result=[
                "message" => "data valid",
                "status" => 400 
            ];
        }

        

        return response()->json($result, $result['status']);
    }
}
