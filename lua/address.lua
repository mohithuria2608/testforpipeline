local function rec_to_map(rec)
    local xrec = map()
    for i, bin_name in ipairs(record.bin_names(rec)) do
        xrec[bin_name] = rec[bin_name]
    end
    return xrec
end

function get_address(stream, isActive)
   local function isActive_filter(rec)
      local val = rec['isActive']
      if val == isActive then
         return true
      else
         return false
      end
   end

  return stream:filter(isActive_filter):map(rec_to_map)
end

function orderby(stream, isActive, bin1)
   local function isActive_filter(rec)
      local val = rec['isActive']
      if val == isActive then
         return true
      else
         return false
      end
   end

   local function mapper(rec)
      local element = map()
      element[bin1] = rec[bin1];
      return element
   end

   local function accumulate(currentList, nextElement)
      local bin1 = nextElement[bin1]
      if currentList[bin1] == nil then
         currentList[bin1] = list()
      end
    return currentList
   end

   local function reducer(this, that)
     return map.merge(this,that)
   end
   
   return stream:filter(isActive_filter):map(mapper):aggregate(map{}, accumulate):reduce(reducer)
 end
