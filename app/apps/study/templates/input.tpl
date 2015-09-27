<div class="col-sm-8 col-sm-offset-2 calendar-input">
	<div class="panel panel-default">
		<div class="panel-heading input-header text-center"> <%= obj.dateString %> </div>
			<% _.each(obj.personalEvents, function(event){ %>

	          <!--   <%= event.title %> -->
	         <% }) %>
		<div class="panel-body">

			<div class="drink-input row col-sm-12">
				<span class="drinks-label"># Standard Drinks</span> 
				<span class="">
					<button class="drink-btn js-decrease-drink glyphicon glyphicon-minus" type="button"> </button> 
					<span class="js-numberOfDrinks"></span> 
					<button class="drink-btn js-increase-drink glyphicon glyphicon-plus" type="button"> </button> 
				</span>
			</div>

			<div class="row">
 			<div class="col-sm-7 col-sm-offset-3 standard-drink-img pull-left "></div>
 			</div>

			<div class="marijuana-input row">
				<span class="marijuana-label"> Marijuana </span> 
				<span class="">
					<button class="marijuana-btn js-marijuana-btn js-no-marijuana"> No  </button> 
				</span>
				<button class="marijuana-btn js-marijuana-btn js-yes-marijuana"> Yes </button> 
				
				<div class="checkbox daily-mj-checkbox ">
  					<label><input type="checkbox" class="" value="" data-toggle="modal" data-target=".bs-example-modal-sm">I smoke Marijuana Daily.</label>
				</div>
			</div>

			<div class="btn-group col-sm-12">
			  <button type="button" class="btn btn-lg col-sm-3 btn-primary iter-day-btn js-prev-day">
			  
			  	<i class="glyphicon glyphicon-chevron-left prev-day"></i>	Previous Day
			  	</button>
			  <button type="button" class="btn btn-lg col-sm-6 btn-primary js-calendar-return">
			  	<i class="glyphicon cal-icon glyphicon-calendar"></i> Calendar</button>
			  <button type="button" class="btn btn-lg col-sm-3 btn-primary iter-day-btn js-next-day">
			  	Next Day
			  	<i class="glyphicon glyphicon-chevron-right prev-day"></i>
			  	</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
    	Are you sure you want to select this option? Selecting "I smoke marijuana daily" will set marijuana use to "true" for every day on the calendar. 
      <div class="modal-footer">
        <div class="">
        <button type="button" class="btn btn-default col-sm-6" data-dismiss="modal">Cancel</button>
      </div>
      <div class="">
        <button type="button" class="btn btn-primary js-daily-mj col-sm-6 " data-dismiss="modal">Confirm</button>
      </div>
      </div>    	
    </div>
  </div>
</div>