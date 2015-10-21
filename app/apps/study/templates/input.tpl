<div class="col-sm-8 col-sm-offset-2 calendar-input">
	<div class="panel panel-default">
		<div class="panel-heading input-header text-center"> <%= obj.dateString %> </div>
			<% _.each(obj.personalEvents, function(event){ %>

	          <!--   <%= event.title %> -->
	         <% }) %>
		<div class="content">
			<div class="drink-input col-sm-12">
				<span class="drinks-label"># Standard Drinks</span> 
				<span class="alcohol-btn-group">
					<button class="drink-btn js-decrease-drink glyphicon glyphicon-minus" type="button"> </button> 
					<span class="js-numberOfDrinks"></span> 
					<button class="drink-btn js-increase-drink glyphicon glyphicon-plus" type="button"> </button> 
				</span>
			</div>

			<div class="row">
 			<div class="col-sm-12 standard-drink-img"></div>
 			</div>

			<div class="marijuana-input">
				<span class="marijuana-label"> Marijuana </span> 
				<span class="marijuana-btn-group">
						<button class="marijuana-btn js-marijuana-btn js-no-marijuana">No</button> 
						<button class="marijuana-btn js-marijuana-btn js-yes-marijuana">Yes</button> 

					<span class="js-dailyMJ-wrapper checkbox daily-mj-checkbox text-center">
	  					<label><input type="checkbox" class="js-dailyMJ-checkbox" value=""<%= obj.dailyMJ == true ? "checked":"" %>>I smoke Marijuana Daily. </label>
					</span>

				</span>
			</div>
		</div>
		<div class="btn-group panel-footer col-sm-12">
		  <button type="button" class="col-sm-3 iter-day-btn js-prev-day"> Previous Day </button>
		  <button type="button" class="col-sm-6 js-calendar-return"> <i class="glyphicon cal-icon glyphicon-calendar"></i> Calendar</button>
		  	<button type="button" class="col-sm-3 iter-day-btn js-next-day"> Next Day </button>
		</div>
	</div>
</div>


<!-- Modal -->
<div class="dailyMJ-modal  modal fade" id="finishStudy" tabindex="-1" role="dialog" aria-labelledby="finishStudy">
  <div class="modal-dialog" role="document">
    <div class="modal-content alert-wrapper">
      <div class="modal-header alert-header">Daily Marijuana Use </div>
      <div class="modal-body text-center alert-body">
        <br>
      Set mariajuana use to <b>true</b> for every day on the calendar. 
      </div>
      <br>
      <div class="modal-footer">
        <div class="alert-btn-group">
       	<button type="button" class="alert-btn right js-dailyMJ-confirm" data-dismiss="modal">Yes</button>
          <button type="button" class="alert-btn left" data-dismiss="modal">No</button>
        </div>
      </div>
    </div>
  </div>
</div>
