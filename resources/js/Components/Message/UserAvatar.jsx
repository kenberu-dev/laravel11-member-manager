const UserAvatar = ({ user, profile = false }) => {
    const sizeClass = profile ? "w-40" : "w-8";

    return (
        <>
            {user.avatar_url && (
                <div className={`chat-image avatar`}>
                    <div className={`rounded-full ${sizeClass}`}>
                        <img src={user.avatar_url} />
                    </div>
                </div>
            )}
            {!user.avatar_url && (
                <div className={`chat-image avatar placeholder`}>
                    <div 
                        className={`rounded-full ${sizeClass} bg-gray-200 text-gray-400 text-center`}
                    >
                        <span className="text-xl">
                            {user.name.substring(0, 1)}
                        </span>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserAvatar;
