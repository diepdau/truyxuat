export const PhotoService = {
  getData() {
      return [
        
            {
              "path": "https://res.cloudinary.com/dzo0r5bea/image/upload/v1702188276/agriculture_traceability/zv7i7togch4paq12ebuz.jpg",
              "filename": "agriculture_traceability/zv7i7togch4paq12ebuz",
              "_id": "657554f4eeaf2980d1bca50f"
            },
            {
              "path": "https://res.cloudinary.com/dzo0r5bea/image/upload/v1702188276/agriculture_traceability/kgv47vclhbcl3gzweyfp.jpg",
              "filename": "agriculture_traceability/kgv47vclhbcl3gzweyfp",
              "_id": "657554f4eeaf2980d1bca510"
            },
            {
              "path": "https://res.cloudinary.com/dzo0r5bea/image/upload/v1702188276/agriculture_traceability/dbwenlgfoshud1ythz5d.jpg",
              "filename": "agriculture_traceability/dbwenlgfoshud1ythz5d",
              "_id": "657554f4eeaf2980d1bca511"
            },
            {
              "path": "https://res.cloudinary.com/dzo0r5bea/image/upload/v1702188276/agriculture_traceability/raujzpczdvhrjwuw8nh9.jpg",
              "filename": "agriculture_traceability/raujzpczdvhrjwuw8nh9",
              "_id": "657554f4eeaf2980d1bca512"
            },
            {
              "path": "https://res.cloudinary.com/dzo0r5bea/image/upload/v1702188276/agriculture_traceability/l9wbmmvb7gjocltdncci.jpg",
              "filename": "agriculture_traceability/l9wbmmvb7gjocltdncci",
              "_id": "657554f4eeaf2980d1bca513"
            },
            {
              "path": "https://res.cloudinary.com/dzo0r5bea/image/upload/v1702188276/agriculture_traceability/cnahbgzy9xjjhao5x6nq.jpg",
              "filename": "agriculture_traceability/cnahbgzy9xjjhao5x6nq",
              "_id": "657554f4eeaf2980d1bca514"
            }
      ];
  },

  getImages() {
    return Promise.resolve(this.getData());
}
};

