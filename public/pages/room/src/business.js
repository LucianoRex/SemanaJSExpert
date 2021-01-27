class Business {
  constructor({ room, media, view, socketBuilder }) {
    this.room = room;
    this.media = media;
    this.view = view;    
    this.socketBuilder = socketBuilder
      .setOnUserConnected(this.onUserConnected())
      .setOnUserDisconnecte(this.onUserDisconnected())
      .build();
    this.socketBuilder.emit("join-room", this.room, "teste 01");
    this.currentStream = {};
  }

  static initialize(deps) {
    const instance = new Business(deps);
    return instance._init();
  }

  async _init() {
    this.currentStream = await this.media.getCamera();
    console.log("init", this.currentStream);
    this.addVideoStream("tste");
  }

  addVideoStream(userId, stream = this.currentStream) {
    const isCurrentId = false;
    this.view.renderVideo({
      userId,
      stream,
    });
  }

  onUserConnected = function () {
    return (userId) => {
      console.log("User Connected", userId);
    };
  };

  onUserDisconnected = function () {
    return (userId) => {
      console.log("User disconnected", userId);
    };
  };
}
