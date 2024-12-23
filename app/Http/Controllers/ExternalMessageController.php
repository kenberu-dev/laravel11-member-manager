<?php

namespace App\Http\Controllers;

use App\Events\ExternalSocketMessage;
use App\Http\Requests\StoreExternalMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\ExternalMeetingLog;
use App\Models\ExternalMessage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ExternalMessageController extends Controller
{
    public function loadOlder(ExternalMessage $message)
    {
        $messages = ExternalMessage::where('created_at', '<', $message->created_at)
            ->where('meeting_logs_id', '=', $message->meeting_logs_id)
            ->latest()
            ->paginate(10);

            return MessageResource::collection($messages);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExternalMessageRequest $request)
    {
        $data = $request->validated();
        $data['sender_id'] = Auth::user()->id;
        $meeting_logs_id = $data['meeting_logs_id'];
        $message = ExternalMessage::create($data);

        if ($meeting_logs_id) {
            ExternalMeetingLog::updateMeetingLogWithMessage($meeting_logs_id, $message);
        }
        ExternalSocketMessage::dispatch($message);

        return new MessageResource($message);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExternalMessage $externalMessage)
    {
        if ($externalMessage->sender_id !== Auth::user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $externalMessage->delete();

        return response('', 204);
    }
}
