module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        mid: String,
        description: String,
        gpsInfo: String,
        imageData: Buffer,
      },
      { versionKey: false , timestamps: true} 
      //{ timestamps: true }
    );
  
    // schema.method("toJSON", function() {
    //   const { __v, _id, ...object } = this.toObject();
    //   object.id = _id;
    //   return object;
    // });
  
    const mission_i = mongoose.model("mission_i", schema);
    return mission_i;
  };