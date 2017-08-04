<?php

namespace App\Http\Controllers;

use App\Gymlocations;

use Illuminate\Http\Request;

class SearchGymController extends Controller
{
    public function searchGyms(Request $request)
    {
        $lat=$request->lat;
        $lng=$request->lng;

        $girl=Gymlocations::whereBetween('lat', [$lat-0.5,$lat+0.5])->whereBetween('lng', [$lng-0.5,$lng+0.5])->get();
        return $girl;
    }
}
