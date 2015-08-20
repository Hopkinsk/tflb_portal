<div class="col-sm-5 col-sm-offset-3 calendar-input">
	<div class="panel panel-default">
		<div class="panel-heading"> <%= obj.dateString %> </div>
			<% _.each(obj.personalEvents, function(event){ %>

	            ~ <%= event.title %> ~
	         <% }) %>
		<div class="panel-body">

			<div>
				<span> Standard Drinks: </span> 
				<button class="btn btn-default js-decrease-drink "> - </button> 
				<span class="js-numberOfDrinks"></span> 
				<button class="btn btn-default js-increase-drink"> + </button> 
			</div>

			<div>
				<span> Marijuana: </span> 
				<button class="btn btn-default js-marijuana-btn js-no-marijuana"> No  </button> 
			
				<button class="btn btn-default js-marijuana-btn js-yes-marijuana"> Yes </button> 
				
				
			</div>



			<div class="btn-group">
			  <button type="button" class="btn btn-primary js-prev-day">Previous Day</button>
			  <button type="button" class="btn btn-primary js-calendar-return">Back to Calendar</button>
			  <button type="button" class="btn btn-primary js-next-day">Next Day</button>
			</div>
		</div>
	</div>
</div>