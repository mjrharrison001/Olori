var Server = (function () {
    function Server(numberOfUsers, numberOfKeys, numberOfActiveUsers, updateTimer, lastSuccessfulUpdate) {
        this.numberOfUsers = numberOfUsers;
        this.numberOfKeys = numberOfKeys;
        this.numberOfActiveUsers = numberOfActiveUsers;
        this.updateTimer = updateTimer;
        this.lastSuccessfulUpdate = lastSuccessfulUpdate;
    }
    return Server;
}());
export { Server };
