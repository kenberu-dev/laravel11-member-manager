<?php

namespace App\Http\Controllers;

use App\Events\SocketMessage;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\MeetingLog;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function loadOlder(Message $message)
    {
        $messages = Message::where('created_at', '<', $message->created_at)
            ->where('meeting_logs_id', '=', $message->meeting_logs_id)
            ->latest()
            ->paginate(10);

            return MessageResource::collection($messages);
    }

    public function store(StoreMessageRequest $request)
    {
        $data = $request->validated();
        $data['sender_id'] = Auth::user()->id;
        $meeting_logs_id = $data['meeting_logs_id'];
        $message = Message::create($data);

        if ($meeting_logs_id) {
            MeetingLog::updateMeetingLogWithMessage($meeting_logs_id, $message);
        }

        SocketMessage::dispatch($message);

        return new MessageResource($message);
    }

    public function destroy(Message $message)
    {
        if ($message->sender_id !== Auth::user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $message->delete();

        return response('', 204);
    }
}
