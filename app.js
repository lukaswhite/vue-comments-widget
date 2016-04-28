Vue.http.options.root = 'http://localhost:8080';

new Vue({

  // The element to bind to
  el : '#comments',

  // The data which comprises this component
  data: {
    entity : { id : null },
    comment : { id : '', name : '', body : '' },
    comments : [ ]
  },
  
  // Function which runs upon initialisation
  ready: function() {        
    
    this.fetch();

    var app = this;

    setInterval(
      function() { 
        app.fetch(); 
      }, 
      5000
    );
  },

  // Methods for this component
  methods: {
    
    fetch : function() {

      this.$http.get('comments').then(function(response) {        
        this.$set( 'comments', response.data );
      });

    },

    add : function() {
      
      if ( this.comment.name && this.comment.body ) {
        
        this.comment.entity_id = this.entity.id;

        this.comments.unshift( this.comment );

        this.$http.post( 'comments', this.comment ).then( function( response ) {          
          console.log( response.data )
          this.comments[ 0 ].id = response.data.id;
        });

        this.comment = { id : null, name : this.comment.name, body : '' };

      } else {
        alert( 'Name and body are both required' );
      }

    }

  }  

});